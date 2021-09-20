using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

using DeviceRegistry.Data;
using DeviceRegistry.DTOs;

namespace DeviceRegistry.Controllers
{
    /*
        The ThingsController allows the client (the SPA in this project)
        to perform actions on the Thing resource. The url for this controller
        is /api/things. Subroutes support GET, POST and DELTE verbs.
    */
    /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="T:DeviceRegistry.Controllers.ThingsController"]/*'/>
    [Controller]
    [Route("api/[controller]")]
    public class ThingsController : ControllerBase
    {
        private readonly ILogger<ThingsController> _log;
        private readonly IThingService _thingService;

        // Creates a new instance of the ThingsController class and receives
        // a logger service and an IThingService via dependency injection.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.ThingsController"]/*'/>
        public ThingsController(ILogger<ThingsController> logger, IThingService thingService)
        {   
            this._log = logger;
            this._thingService = thingService;
        }

        // GET - api/things
        // Returns a List containing all existing Thing objects in the 
        // Things collection.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.GetThings"]/*'/>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ThingDTO>))]
        public async Task<IActionResult> GetThings()
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - GET api/things";
            _log.LogInformation(msg);

            var things = await _thingService.GetThingsAsync();

            return new OkObjectResult(things);
        }

        // GET - api/things/{identifier}
        // Searches the Thing collection for an instance with the 
        // given identifier. Returns a 404 Not Found if no such Thing exists.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.GetThingByIdentifier(string identifier)"]/*'/>
        [HttpGet("{identifier:string}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ThingDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetThingByIdentifier(string identifier)
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - GET api/things/{identifier}";
            _log.LogInformation(msg);

            try 
            {
                var thing = await _thingService.GetThingAsync(identifier);
                return Ok(thing);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // POST - api/things
        // Receives a Thing object in the request body and adds it to the
        // database collection after successful model validation. 
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.CreateThing(ThingDTO newThing)"]/*'/>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ThingDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateThing(ThingDTO newThing)
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - POST api/things";
            _log.LogInformation(msg);

            if (!ModelState.IsValid) 
            {
                // Temporary response status code.
                return BadRequest();
            }

            await _thingService.CreateThingAsync(newThing);

            return CreatedAtAction(
                nameof(GetThingByIdentifier), 
                new { identifier = newThing.Identifier }, 
                newThing
            );
        }

        // DELETE - api/things/{identifier}
        // Searches the Thing collection for an instance with the 
        // given identifier and then deletes it. Returns a 404 Not Found 
        // if no such Thing exists.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.DeleteThing(string identifier)"]/*'/>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteThing(string identifier)
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - GET api/things/{identifier}";
            _log.LogInformation(msg);

            try
            {
                await _thingService.DeleteThingAsync(identifier);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}