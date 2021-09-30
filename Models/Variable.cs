using System;
using System.ComponentModel.DataAnnotations;

namespace DeviceRegistry.Models
{
    public enum VariableType
    {
        Number,
        String,
        Boolean
    } 

    public class Variable
    {
        [Key]
        public Guid VariableId { get; set; }

        [Required]
        public string ThingId { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [Required]
        public VariableType Type { get; set; }
    }
}