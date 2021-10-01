using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using DeviceRegistry.DTOs;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using DeviceRegistry.Models;

namespace DeviceRegistry.Data
{
    // An implementation of IThingService for relational
    // databases such as SQLite and SQL Server.
    public class RelationalThingRepository : IThingService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public RelationalThingRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        async Task IThingService.CreateThingAsync(ThingDTO newThing)
        {
            var thing = _mapper.Map<Thing>(newThing);
            _context.Things.Add(thing);
            await _context.SaveChangesAsync();
        }

        async Task IThingService.DeleteThingAsync(string identifier)
        {
            var thing = await _context.Things.FindAsync(identifier);

            if (thing is null)
                throw new KeyNotFoundException("No Thing with given identifier found.");

            _context.Things.Remove(thing);
            await _context.SaveChangesAsync();
        }

        async Task<ThingDTO> IThingService.GetThingAsync(string identifier)
        {
            var thing = await _context.Things.FindAsync(identifier);

            if (thing is null)
                throw new KeyNotFoundException("No Thing with given identifier found.");

            return _mapper.Map<ThingDTO>(thing);
        }

        Task<List<ThingDTO>> IThingService.GetThingsAsync()
        {
            var things = _context.Things
                .Select(thing => _mapper.Map<ThingDTO>(thing));

            return things.ToListAsync();
        }

        async Task<List<VariableDTO>> IThingService.GetThingVariablesAsync(string identifier)
        {
            var thing = await _context.Things.FindAsync(identifier);

            if (thing is null)
                throw new KeyNotFoundException("No Thing with given identifier found.");

            var variables = await _context.Variables
                .Where(v => v.ThingId == identifier)
                .Select(v => _mapper.Map<VariableDTO>(v))
                .ToListAsync();

            return variables;
        }

        async Task IThingService.AddVariableAsync(VariablePostDTO variablePostDTO)
        {
            var variable = _mapper.Map<Variable>(variablePostDTO);
            variable.VariableId = Guid.NewGuid();
            _context.Variables.Add(variable);
            await _context.SaveChangesAsync();
        }

        async Task IThingService.DeleteVariableAsync(Guid variableId)
        {
            var variable = await _context.Variables.FindAsync(variableId);

            if (variable is null)
                throw new KeyNotFoundException("No Variable with given identifier found.");

            _context.Variables.Remove(variable);
            await _context.SaveChangesAsync();
        }
    }
}