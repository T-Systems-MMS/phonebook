import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, of } from 'rxjs';
import { flatMap, map, publishReplay } from 'rxjs/operators';
import { BuildingPart, Room } from 'src/app/shared/models';

@Injectable()
export class RoomService {
  private roomTreeCache: BuildingTreeNode[] | null = null;
  private allRoomsObservable: Observable<Room[]> | null = null;

  constructor(private http: HttpClient) {}

  public getById(buildingId: string, number: String | null): Observable<Room | null> {
    return this.getAll().pipe(
      map(rooms => {
        return (
          rooms.find(x => {
            return x.Number === number && x.BuildingId.toString() === buildingId;
          }) || null
        );
      })
    );
  }

  public getAll(): Observable<Room[]> {
    if (this.allRoomsObservable != null) {
      return this.allRoomsObservable;
    }

    const observable = this.http.get<Room[]>('/api/rooms').pipe(publishReplay());
    (observable as ConnectableObservable<Room[]>).connect();
    this.allRoomsObservable = observable;
    return this.allRoomsObservable;
  }

  public getRoomTree(): Observable<BuildingTreeNode[]> {
    if (this.roomTreeCache != null) {
      return of(this.roomTreeCache);
    }
    return this.getAll().pipe(
      flatMap(rooms => {
        const roomTree: BuildingTreeNode[] = new Array<BuildingTreeNode>();
        rooms.forEach(room => {
          // Check if Location already exists
          const locationNode = roomTree.find(node => {
            return node.id === room.Place;
          });
          if (locationNode !== undefined) {
            // If Location does exist, check if Building does exist
            const buildingNode = locationNode.children.find(node => {
              return node.id === room.Building;
            });
            if (buildingNode !== undefined) {
              // If Building does exist, check if Floor does exist
              const floorNode = buildingNode.children.find(node => {
                return node.id === room.Floor.toString();
              });
              if (floorNode !== undefined) {
                // If Floor does exist, room gets pushed to Floor
                floorNode.children.push({
                  id: room.Id,
                  name: room.Number,
                  type: BuildingPart.room,
                  data: room,
                  children: [],
                  path: [locationNode.id, buildingNode.id, floorNode.id, room.Number]
                });
              } else {
                // Floor does not exist, gets created underneath the Building, with Room inside
                buildingNode.children.push({
                  id: room.Floor.toString(),
                  name: room.Floor.toString(),
                  type: BuildingPart.floor,
                  children: [
                    {
                      id: room.Id,
                      name: room.Number,
                      type: BuildingPart.room,
                      children: [],
                      data: room,
                      path: [locationNode.id, buildingNode.id, room.Floor.toString(), room.Number]
                    }
                  ],
                  data: null,
                  path: [locationNode.id, buildingNode.id, room.Floor.toString()]
                });
              }
            } else {
              //Building does not exist, gets created underneath the Location, with Floor and Room inside
              locationNode.children.push({
                id: room.Building,
                name: room.Building,
                type: BuildingPart.building,
                data: null,
                children: [
                  {
                    id: room.Floor.toString(),
                    name: room.Floor.toString(),
                    type: BuildingPart.floor,
                    data: null,
                    children: [
                      {
                        id: room.Id,
                        name: room.Number,
                        type: BuildingPart.room,
                        data: room,
                        children: [],
                        path: [locationNode.id, room.Building, room.Floor.toString(), room.Number]
                      }
                    ],
                    path: [locationNode.id, room.Building, room.Floor.toString()]
                  }
                ],
                path: [locationNode.id, room.Building]
              });
            }
          } else {
            // Location does not exist, gets created in root, with Building, Floor and Room inside
            roomTree.push({
              id: room.Place,
              name: room.Place,
              type: BuildingPart.location,
              data: null,
              children: [
                {
                  id: room.Building,
                  name: room.Building,
                  type: BuildingPart.building,
                  data: null,
                  children: [
                    {
                      id: room.Floor.toString(),
                      name: room.Floor.toString(),
                      type: BuildingPart.floor,
                      data: null,
                      children: [
                        {
                          id: room.Id,
                          name: room.Number,
                          type: BuildingPart.room,
                          data: room,
                          children: [],
                          path: [room.Place, room.Building, room.Floor.toString(), room.Number]
                        }
                      ],
                      path: [room.Place, room.Building, room.Floor.toString()]
                    }
                  ],
                  path: [room.Place, room.Building]
                }
              ],
              path: [room.Place]
            });
          }
        });
        // Sort Floors from low to high
        roomTree.forEach(location => {
          location.children.forEach(building => {
            building.children = building.children.sort((floorA, floorB) => {
              return Number(floorB.id) - Number(floorA.id);
            });
          });
        });
        this.roomTreeCache = roomTree;
        return of(roomTree);
      })
    );
  }

  public getNodeByPath(pathArray: string[], level: number = 0): Observable<BuildingTreeNode | null> {
    return this.getRoomTree().pipe(
      flatMap(tree => {
        return of(getNodeFromTreeSync(pathArray, tree, level));
      })
    );
  }
}

export function getNodeFromTreeSync(
  paramArray: string[],
  tree: BuildingTreeNode[],
  level: number = 0
): BuildingTreeNode | null {
  if (paramArray.length === 1) {
    return (
      tree.find(node => {
        return node.path[level].toString() === paramArray[0];
      }) || null
    );
  } else {
    const nextNode = tree.find(node => {
      return node.path[level].toString() === paramArray[0];
    });
    if (nextNode == null || nextNode.children.length === 0) {
      return null;
    }
    return getNodeFromTreeSync(paramArray.slice(1, paramArray.length), nextNode.children, level + 1);
  }
}

export interface BuildingTreeNode {
  id: string;
  name: string;
  type: BuildingPart;
  data: Room | Location | null;
  children: BuildingTreeNode[];
  path: string[];
}
