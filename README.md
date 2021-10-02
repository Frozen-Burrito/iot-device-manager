# IoT Device Manager

> Work in progress

## Contents
- [About the Project](#about-the-project)
- [Repo Structure](#repo-structure)
- [Software Requirements](#software-requirements)
- [API Dependencies](#api-dependencies)
- [Other Information](#other-information)

## About the Project

You can check the [online demo](https://iot-device-manager.azurewebsites.net "IoT Device Manager") for this application, deployed using Azure. It is not always running to optimize costs.

This project started as a sample to learn about the integration of ASP.NET Core and React.js, but it has since then evolved to an online IoT device manager service. Users are able to add *Things* and monitor data associated with them, as well as control devices from the web interface.

Key features:
- Display all intelligent devices on a dashboard.
- View device details and configure variables, data and controls.

## Repo Structure
This project contains several directories, from both the ASP.NET Core web API and the React.js client (`ClientApp`). 

```
iot-device-manager/
├── README.md
├── .gitignore
├── DeviceRegistry.csproj
├── Program.cs
├── Startup.cs
└── Controllers/
	├── ThingsController.cs
	└── VariablesController.cs
└── Data/
	├── DataContext.cs
	├── IThingService.cs
	└── RelationalThingRepo.cs
└── Docs/
	└── Controllers/
	└── Data/
└── Models/
	├── AutoMapperProfile.cs
	├── ThingDTO.cs
	├── VariableDTO.cs
	└── VariablePostDTO.cs
└── Models/
	├── Thing.cs
	└── Variable.cs
└── Pages/
	├── _ViewImports.cshtml
	├── Error.cshtml
	└── Error.cshtml.cs
└── Properties/
	└── launchSettings.json
└── ClientApp/
	├── README.md
	├── package.json
	├── package-lock.json
	├── .gitignore
	└── public/
		└── ...
	└── src/
		├── index.js
		├── registerServiceWorker.js
		├── App.js
		├── App.test.js
		├── custom.css
		└── components/ (React jsx components)
		└── img/
			└── ...
		└── pages/ (Pages for the client app)
```

## Software requirements
- .NET SDK (5.0.303)
- Git

## API Dependencies
- [AutoMapper (10.1.1)](https://www.nuget.org/packages/AutoMapper/10.1.1)
- [AutoMapper.Extensions.Microsoft.DependencyInjection (8.1.1)](https://www.nuget.org/packages/AutoMapper.Extensions.Microsoft.DependencyInjection/8.1.1)
- [Microsoft.EntityFrameworkCore.Design (5.0.10)](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Design/5.0.10)
- [Microsoft.AspNetCore.SpaServices.Extensions (5.0.9)](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices.Extensions/5.0.9)
- [Microsoft.EntityFrameworkCore.Sqlite (5.0.10)](https://www.nuget.org/packages/Microsoft.Data.Sqlite.Core/5.0.3)
- [Microsoft.EntityFrameworkCore.SqlServer (5.0.10)](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/5.0.3)

## Other information
This project is still work in progress.