using System.Collections.Generic;
using System.Threading.Tasks;
using PARiConnect.WebApp.Dtos;

namespace PARiConnect.WebApp.Repository
{
    public interface IAssessmentReviewRepository
    {
         Task<IEnumerable<AssessmentReviewDto>> GetAssessmentsByStatus(int id);
         Task<IEnumerable<AssessmentReviewDto>> GetAssessmentReviews(int id);
    }
}