using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.Diagnostics;
using PARiConnect.WebApp.Models;
using Microsoft.AspNetCore.Authorization;
using PARiConnect.WebApp.Dtos;
using PARiConnect.WebApp.Repository;

namespace PARiConnect.WebApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AssessmentDataController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IAssessmentReviewRepository _repo;
        public AssessmentDataController(IHostingEnvironment hostingEnvironment, IAssessmentReviewRepository repo)
        {
            _repo = repo;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("[action]/{id?}")]
        public async Task<IActionResult> GetAssessmentsByStatus(int id)
        {
            var assReviewsFromRepo = await _repo.GetAssessmentsByStatus(id);
            if (assReviewsFromRepo == null)
                return NoContent();
            return Ok(assReviewsFromRepo);
        }

        [HttpGet("[action]/{id?}")]
        public async Task<IActionResult> GetAssessmentReviews(int id)
        {
            if (id > 0)
            {
                var assReviewsFromRepo = await _repo.GetAssessmentReviews(id);
                if (!assReviewsFromRepo.Any())
                    return NoContent();
                return Ok(assReviewsFromRepo);
            }
            else
            {
                ModelState.AddModelError("id", "ID must exist to retrieve assessment reviews.");
                return BadRequest(ModelState);
            }
        }

        [HttpGet("[action]")]
        public async Task<bool> IsAlive()
        {
            CoreServiceDevReference.CoreServiceClient coreServiceClient = new CoreServiceDevReference.CoreServiceClient();
            try
            {
                await coreServiceClient.HelloWorldAsync();
                return true;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return false;
            }

        }
    }


    public sealed class ClientAssessmentStatus
    {

        private readonly String name;
        private readonly int value;

        public static readonly ClientAssessmentStatus PaperPencilEntryIncomplete = new ClientAssessmentStatus(1, "Not Completed");
        public static readonly ClientAssessmentStatus PaperPencilEntryCompletedScored = new ClientAssessmentStatus(6, "Completed, Scored 6");
        public static readonly ClientAssessmentStatus AdminOnsiteEntryCompletedScored = new ClientAssessmentStatus(12, "Completed, Scored 12");

        private ClientAssessmentStatus(int value, String name)
        {
            this.name = name;
            this.value = value;
        }

        public override String ToString()
        {
            return name;
        }
        public static string GetStatus(int statusKey)
        {
            string status = "";
            switch (statusKey)
            {
                case 1:
                    status = ClientAssessmentStatus.PaperPencilEntryIncomplete.ToString();
                    break;
                case 6:
                    status = ClientAssessmentStatus.PaperPencilEntryCompletedScored.ToString();
                    break;
                case 12:
                    status = ClientAssessmentStatus.AdminOnsiteEntryCompletedScored.ToString();
                    break;
                default:
                    status = "Unknown Status";
                    break;
            }
            return status;
        }
        public static bool GetCompleted(int statusKey)
        {
            bool completed = true;
            switch (statusKey)
            {
                case 1:
                case 6:
                case 12:
                    completed = true;
                    break;
                default:
                    completed = false;
                    break;
            }
            return completed;
        }
    }

}
