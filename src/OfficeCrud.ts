// Importing the JSON file
import officeData from './mocks/OfficeMock.json';

interface Request {
  platformRequestId: string;
  number: string;
  platformName: string;
  platformId: string;
  ownerId: string;
  ownerName: string;
  creationTime: string;
  cityId: string;
  municipalityId: string | null;
  waitingApproval: boolean;
  containerId: string;
  officeId: string | null;
}

interface OfficeData {
  [key: string]: {
    name: string;
    requests: Request[];
  };
}

/**
 * Get all requests for a specific office.
 * @param officeId - The ID of the office.
 * @returns An array of requests for the office.
 */
function getAllRequestsByOffice(officeId: string): Request[] {
  const office = Object.values(officeData).find(o => o.requests.some(r => r.officeId === officeId));
  return office ? office.requests.filter(r => r.officeId === officeId) : [];
}

/**
 * Get details of a specific request by platformRequestId.
 * @param requestId - The platformRequestId of the request.
 * @returns The request details, or null if not found.
 */
function getRequestDetails(requestId: string): Request | null {
  for (const office of Object.values(officeData)) {
    const request = office.requests.find(r => r.platformRequestId === requestId);
    if (request) {
      return request;
    }
  }
  return null;
}

// Example usage:
const allRequests = getAllRequestsByOffice("3077");
console.log("All Requests for Office 3077:", allRequests);

const requestDetails = getRequestDetails("4617356694");
console.log("Details for Request 4617356694:", requestDetails);
