using System;
using System.ComponentModel.DataAnnotations;

using DeviceRegistry.Models; 

namespace DeviceRegistry.DTOs
{
    public class VariableDTO
    {
        public Guid VarId { get; set; }

        [Required]
        public string ThingId { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        public VariableType Type { get; set; }
    }
}