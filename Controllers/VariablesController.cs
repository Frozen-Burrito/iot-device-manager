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
    //TODO: Documentation for VariablesController
    /*
        The VariablesController allows the client (the SPA in this project)
        to perform actions on the Variable resource associated to a Thing. The 
        url for this controller is /api/vars. Routes support GET, POST and DELTE verbs.
    */
    /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="T:DeviceRegistry.Controllers.ThingsController"]/*'/>
    [Controller]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class VariablesController : ControllerBase
    {
        private readonly ILogger<VariablesController> _log;
        private readonly IThingService _thingService;

        //TODO: Docs for VariablesController constructor
        // Creates a new instance of the ThingsController class and receives
        // a logger service and an IThingService via dependency injection.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.ThingsController"]/*'/>
        public VariablesController(ILogger<VariablesController> logger, IThingService thingService)
        {   
            this._log = logger;
            this._thingService = thingService;
        }

        //TODO: Documentation
        // GET - api/variables/from/{thingIdentifier}
        // Returns a List containing all existing Variables
        // associated with a certain Thing.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.GetThings"]/*'/>
        [HttpGet("from/{thingIdentifier}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<VariableDTO>))]
        public async Task<IActionResult> GetThingVariables(string thingIdentifier)
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - GET api/variables/from/{thingIdentifier}";
            _log.LogInformation(msg);

            var variables = await _thingService.GetThingVariablesAsync(thingIdentifier);

            return new OkObjectResult(variables);
        }
        
        //TODO: Documentation
        // POST - api/variables
        // Receives a Variable object in the request body and adds it to the
        // database collection after successful model validation. 
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.CreateThing(ThingDTO newThing)"]/*'/>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(VariableDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateVariable([FromBody] VariablePostDTO newVariable)
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - POST api/variables";
            _log.LogInformation(msg);

            if (!ModelState.IsValid) 
            {
                _log.LogWarning("Model validation failed.");
                return BadRequest(ModelState.Values);
            }

            await _thingService.AddVariableAsync(newVariable);

            return CreatedAtAction(
                nameof(GetThingVariables), 
                new { thingIdentifier = newVariable.ThingId }, 
                newVariable
            );
        }

        //TODO: Documentation
        // DELETE - api/variables/{varId}
        // Searches the Variable collection for an instance with the 
        // given varId and then deletes it. Returns a 404 Not Found 
        // if no such Variable exists.
        /// <include file='../Docs/Controllers/ThingsController.xml' path='/doc/members/member[@name="M:DeviceRegistry.Controllers.ThingsController.DeleteThing(string identifier)"]/*'/>
        [HttpDelete("{varId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteVariable(Guid varId)
        {
            string msg = $"{DateTime.UtcNow.ToLongDateString()} - DELETE api/variables/{varId.ToString()}";
            _log.LogInformation(msg);

            try
            {
                await _thingService.DeleteVariableAsync(varId);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}