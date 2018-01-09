using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PARiConnect.WebApp.Dtos;
using PARiConnect.WebApp.Models;

namespace PARiConnect.WebApp.Repository
{
    public class AssessmentReviewRepository : IAssessmentReviewRepository
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public AssessmentReviewRepository(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;

        }
        public async Task<IEnumerable<AssessmentReviewDto>> GetAssessmentsByStatus(int id)
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;

            if (await IsAlive())
            {
                CoreServiceDevReference.CoreServiceClient coreServiceClient = new CoreServiceDevReference.CoreServiceClient();

                var clientAssessmentReviews = await coreServiceClient.GetClientAssessmentsForReview_NEWAsync(null, 54338, null, null); //54338

                var clientAssesReviews = clientAssessmentReviews
                    .Select(x => new AssessmentReviewDto
                    {
                        Assessment = x.AssessmentForm.Assessment.Name + " " + x.AssessmentForm.Name,
                        ClientName = x.Client.FirstName + " " + x.Client.LastName,
                        LastUpdated = x.TestDate,
                        StatusKey = x.StatusKey
                    });
                if (id > 0)
                {
                    clientAssesReviews = clientAssesReviews.Where(x => StatusTypes.GetCompletedStatuses(true).Contains(x.StatusKey));
                }
                else
                {
                    clientAssesReviews = clientAssesReviews.Where(x => StatusTypes.GetCompletedStatuses(false).Contains(x.StatusKey));
                }
                return clientAssesReviews;
            }
            //else
            //{           
            //var JSON = System.IO.File.ReadAllText(contentRootPath + "/data/clientAssessments.json");
            //return JsonConvert.DeserializeObject<IEnumerable<AssessmentReviewDto>>(JSON);
            //}
            return null;



        }

        public async Task<IEnumerable<AssessmentReviewDto>> GetAssessmentReviews(int id)
        //public async Task<IEnumerable<AssessmentReviewDto>> GetAssessmentsByStatus(int id)
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            CoreServiceDevReference.CoreServiceClient coreServiceClient = new CoreServiceDevReference.CoreServiceClient();

            var clientAssessmentReviews = await coreServiceClient.GetClientAssessmentsForReview_NEWAsync(null, id, null, null); //54338

            var clientAssesReviews = clientAssessmentReviews
                .Select(x => new AssessmentReviewDto
                {
                    Assessment = x.AssessmentForm.Assessment.Name + " " + x.AssessmentForm.Name,
                    ClientName = x.Client.FirstName + " " + x.Client.LastName,
                    LastUpdated = x.TestDate,
                    StatusKey = x.StatusKey
                });

            return clientAssesReviews;
        }

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
}