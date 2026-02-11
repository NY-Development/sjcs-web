import * as kanbanService from "../services/kanban.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getBoard = async (req, res) => {
  const board = await kanbanService.getKanbanBoard();
  return successResponse(res, board, "Kanban board fetched");
};
