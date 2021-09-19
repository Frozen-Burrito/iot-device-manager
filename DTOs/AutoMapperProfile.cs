using AutoMapper;
using DeviceRegistry.Models;
using DeviceRegistry.DTOs;

namespace DeviceRegistry.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Thing, ThingDTO>();

            CreateMap<ThingDTO, Thing>();
        }
    }
}