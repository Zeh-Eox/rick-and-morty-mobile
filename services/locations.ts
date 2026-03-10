import { LocationsResponse } from "@/types/locations";
import { HTTP_CLIENT } from "./rickAndMorty";

export const getLocations = async (
  page: number,
): Promise<LocationsResponse> => {
  try {
    const response = await HTTP_CLIENT.get<LocationsResponse>(
      `/location?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error("Get Locations Error:", error);
    throw error;
  }
};
