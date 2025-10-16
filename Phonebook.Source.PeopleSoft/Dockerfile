#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim@sha256:a9e160dbf5ed62c358f18af8c4daf0d7c0c30f203c0dd8dff94a86598c80003b AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster@sha256:ed737e6920105e2a5cdcd13b9697e7973011e5619339ea64e30871ba0b53fec8 AS build
WORKDIR /src
COPY ["src/Phonebook.Source.PeopleSoft/Phonebook.Source.PeopleSoft.csproj", "src/Phonebook.Source.PeopleSoft/"]
COPY ["src/Phonebook.Source.PeopleSoft.Models/Phonebook.Source.PeopleSoft.Models.csproj", "src/Phonebook.Source.PeopleSoft.Models/"]
RUN dotnet restore "src/Phonebook.Source.PeopleSoft/Phonebook.Source.PeopleSoft.csproj"
COPY . .
WORKDIR "/src/src/Phonebook.Source.PeopleSoft"
RUN dotnet build "Phonebook.Source.PeopleSoft.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Phonebook.Source.PeopleSoft.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Phonebook.Source.PeopleSoft.dll"]
