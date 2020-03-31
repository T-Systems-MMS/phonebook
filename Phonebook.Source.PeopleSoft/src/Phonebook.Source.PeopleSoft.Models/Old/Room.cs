using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old
{
public class Room
{
    private readonly Models.Room room;

    public Room(Phonebook.Source.PeopleSoft.Models.Room room)
    {
        this.room = room;
    }
    public string Building
    {
        get
        {
            if (room == null || room.BuildingPart == null)
            {
                return string.Empty;
            }
            if (room?.BuildingPart?.Building?.Name != null && room?.BuildingPart?.Building?.Number != null)
            {
                return room.BuildingPart.Building.Name + " " + room.BuildingPart.Building.Number;
            }
            if (room?.Floor?.Building?.Name != null && room?.Floor?.Building?.Number != null)
            {
                return room.Floor.Building.Name + " " + room.Floor.Building.Number;
            }
            return string.Empty;
        }
    }
    public string BuildingId
    {
        get
        {
            if (room == null || room.BuildingPart == null)
            {
                return string.Empty;
            }
            if (room?.BuildingPart?.Building != null)
            {
                return room.BuildingPart.Building.Id.ToString();
            }
            if (room?.Floor?.Building?.Id != null)
            {
                return room.Floor.Building.Id.ToString();
            }
            return string.Empty;
        }
    }
    public int? Floor {
        get {
            return room?.Floor?.Number;
        }
    }
    public string Description
    {
        get
        {
            if (room == null)
            {
                return string.Empty;
            }
            if (room?.Floor?.Building?.Address != null)
            {
                return room.Floor.Building.Address;
            }
            if (room?.BuildingPart?.Building?.Address != null)
            {
                return room.BuildingPart.Building.Address;
            }
            return string.Empty;
        }
    }
    public string Phone {
        get {
            return string.Empty;
        }
    }
    public string Number {
        get {
            return room?.Number == null ? string.Empty : room.Number;
        }
    }
    public string Id {
        get {
            return room == null ? string.Empty : room.Id.ToString();
        }
    }
    public string Place {
        get {
            return room?.Floor?.Building?.Location?.Name != null ? room.Floor.Building.Location.Name: room?.BuildingPart?.Building?.Location?.Name != null ? room.BuildingPart.Building.Location.Name : string.Empty;
        }
    }
    public string FloorPlan {
        get {
            return room?.Map == null ? string.Empty : room.Map;
        }
    }


    private int? GetFloorNumber()
    {
        if (
            room.Floor.Description == null &&
            room.Number == null
        )
        {
            return null;
        }

        // the easy formats

        if (
            room.Floor.Description != null &&
            Regex.Match(room.Floor.Description, @".*\/ ([0 - 9] *)\. .*").Success
        )
        {
            return Int32.Parse(Regex.Replace(room.Floor.Description, @".*\/ ([0 - 9] *)\. .*", "$1"));
            //return (room.Floor.Description).replace(/.*\/ ([0 - 9] *)\. .*/ g, '$1');
        }

        // format: gnmfng 6OG blup blup
        if (Regex.Match(room.Number, @".*? ([0 - 9] *)OG ", RegexOptions.IgnoreCase).Success)
        {
            Int32.Parse(Regex.Replace(room.Number, @".*? ([0 - 9] *)OG ", "$!"));
            //return room.Number.replace(/.*? ([0 - 9] *)OG / gi, '$1');
        }
        // format: B3-2000-6000

        if (Regex.Match(room.Number, @"[A - Z]([0 - 9] *) -.*", RegexOptions.IgnoreCase).Success)
        {
            return Int32.Parse(Regex.Replace(room.Number, @"[A - Z]([0 - 9] *) -.*", "$1", RegexOptions.IgnoreCase));
            //return room.Number.replace(/[A - Z]([0 - 9] *) -.*/ gi, '$1');
        }
        // format: "AZ5.011/90"

        if (Regex.Match(room.Number, @"[A - Z] * ([0 - 9] *)\.[0 - 9] *\/[0 - 9] *", RegexOptions.IgnoreCase).Success)
        {
            return Int32.Parse(Regex.Replace(room.Number, @"[A - Z] * ([0 - 9] *)\.[0 - 9] *\/[0 - 9] *", "$1", RegexOptions.IgnoreCase));
            //return room.Number.replace(/[A - Z] * ([0 - 9] *)\.[0 - 9] *\/[0 - 9] */ gi, '$1')
        }
        // format: "AZ5.011"

        if (Regex.Match(room.Number, @"[A - Z] * ([0 - 9] *)\.[0 - 9] *", RegexOptions.IgnoreCase).Success)
        {
            return Int32.Parse(Regex.Replace(room.Number, @"[A - Z] * ([0 - 9] *)\.[0 - 9] *", "$1", RegexOptions.IgnoreCase));
            //return room.Number.replace(/[A - Z] * ([0 - 9] *)\.[0 - 9] / gi, '$1')
        }

        // The complicated parsing starts here....

        // Get something like this "ZZS234Bauteil32432555" from room.map
        // Get something like this "Bauteil 32432" form room.buildingPart.description
        // remove all whitespace from the description
        // the number after the cleaned description part is hopefully the floor number
        if (room.Map != null && room.BuildingPart != null && room.BuildingPart.Description != null)
        {
            var buildIngPartLongName = Regex.Replace(room.BuildingPart.Description, @"\s ", string.Empty); // remove all whitespaces
            var regexString = @$"[A - Z0 - 9] *{ buildIngPartLongName} ([0 - 9] *)";
            if (Regex.Match(room.Map, regexString, RegexOptions.IgnoreCase).Success)
            {
                return Int32.Parse(Regex.Replace(room.Map, regexString, "$1", RegexOptions.IgnoreCase));
                //return room.Map.replace(regexString, '$1');
            }
        }

        // Get something like this "aasdfkdfng3424G34" from room.map
        // Get something like this "G3" form room.floor.building.shortName
        // the number after the shortName part is hopefully the floor number
        if (room.Map != null && room.Floor != null && room.Floor.Building != null && room.Floor.Building.ShortName != null)
        {
            var regexString = @$"[A - Z0 - 9] *{ room.Floor.Building.ShortName} ([0 - 9] *)";
            //var regexString = new RegExp(`[A - Z0 - 9] *${ room.Floor.Building.ShortName} ([0 - 9] *)`, 'gi');
            if (Regex.Match(room.Map, regexString, RegexOptions.IgnoreCase).Success)
            {
                return Int32.Parse(Regex.Replace(room.Map, regexString, "$1", RegexOptions.IgnoreCase));
                //return room.Map.replace(regexString, '$1');
            }
        }

        // TODO: add warn
        return null;
    }
}
}
