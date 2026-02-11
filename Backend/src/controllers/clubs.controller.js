import * as clubsService from "../services/clubs.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const listClubs = async (req, res) => {
  const clubs = await clubsService.listClubs();
  return successResponse(res, clubs, "Clubs fetched");
};

export const getClub = async (req, res) => {
  const club = await clubsService.getClubById(req.params.id);
  return successResponse(res, club, "Club fetched");
};

export const getAnnouncements = async (req, res) => {
  const announcements = await clubsService.getClubAnnouncements(req.params.id);
  return successResponse(res, announcements, "Club announcements fetched");
};
