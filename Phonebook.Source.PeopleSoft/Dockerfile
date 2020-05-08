#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim@sha256:21d9448c98bf4968b72f64c484117f6bf04e27ff3ebc6af6ff7ba3ed1e894f82 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster@sha256:d81d9ab0253c2c578578b2032955984562684c182e3a15dacc3bbdb31260d4e4 AS build
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
