using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeviceRegistry.Models
{
    public enum TypeOfThing
    {
        Light,
        Device,
        Panel,
        Sensor,
    }

    public class Thing
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Identifier { get; set; }

        [Required]
        [MaxLength(100)]
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