using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using DeviceRegistry.DTOs;

namespace ReactAppSample.Data
{
    // Provides asynchronous methods to perform operations
    // on the Things DbSet collection. 
    /// <include file='../Docs/Data/IThingService.xml' path='/doc/members/member[@name="T:DeviceRegistry.Data.IThingService"]/*'/>
    public interface IThingService
    {
        // Get a list containing all Thing objects.
        /// <include file='../Docs/Data/IThingService.xml' path='/doc/members/member[@name="T:DeviceRegistry.Data.IThingService.GetThingsAsync"]/*'/>
        Task<List<ThingDTO>> GetThingsAsync();

        // Search the Thing collection for an instance with the 
        // given identifier. Return the Thing if found, otherwise
        // throw not found exception.
        /// <include file='../Docs/Data/IThingService.xml' path='/doc/members/member[@name="T:DeviceRegistry.Data.IThingService.GetThingAsync(string identifier)"]/*'/>
        Task<ThingDTO> GetThingAsync(string identifier);

        // Receive a new Thing object, add it to the DbSet and
        // save changes to the database.
        /// <include file='../Docs/Data/IThingService.xml' path='/doc/members/member[@name="T:DeviceRegistry.Data.IThingService.CreateThingAsync(ThingDTO thing)"]/*'/>
        Task CreateThingAsync(ThingDTO thing);

        // Search the Thing collection for an instance with the 
        // given identifier. Remove the Thing object if found, otherwise
        // throw not found exception.
        /// <include file='../Docs/Data/IThingService.xml' path='/doc/members/member[@name="T:DeviceRegistry.Data.IThingService.DeleteThingAsync(string identifier)"]/*'/>
        Task DeleteThingAsync(string identifier);
    }
}