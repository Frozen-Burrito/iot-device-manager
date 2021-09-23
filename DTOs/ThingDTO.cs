using System;
using System.ComponentModel.DataAnnotations;

using DeviceRegistry.Models;

namespace DeviceRegistry.DTOs
{
    public class ThingDTO
    {
        [Key]
        public string Identifier { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public string Labels { get; set; }

        [MaxLength(300)]
        public string ShortDescription { get; set; }

        [Required]
        public TypeOfThing Type { get; set; }

        [Required]
        public string IPAddress { get; set; }
    }
}