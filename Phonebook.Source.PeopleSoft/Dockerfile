#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim@sha256:a9e160dbf5ed62c358f18af8c4daf0d7c0c30f203c0dd8dff94a86598c80003b AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster@sha256:1aa53e4fa32dbba836e64e7863955b6b2b165f3a4f8f8aeed648a249300fae07 AS build
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
