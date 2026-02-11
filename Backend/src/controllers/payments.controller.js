import * as paymentService from "../services/payment.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createPayment = async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  return successResponse(res, payment, "Payment created", 201);
};

export const listPayments = async (req, res) => {
  const payments = await paymentService.listPayments();
  return successResponse(res, payments, "Payments fetched");
};

export const getPayment = async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.id);
  return successResponse(res, payment, "Payment fetched");
};

export const updatePayment = async (req, res) => {
  const payment = await paymentService.updatePayment(req.params.id, req.body);
  return successResponse(res, payment, "Payment updated");
};

export const deletePayment = async (req, res) => {
  const payment = await paymentService.deletePayment(req.params.id);
  return successResponse(res, payment, "Payment deleted");
};

export const markPaid = async (req, res) => {
  const payment = await paymentService.markPaid(req.params.id);
  return successResponse(res, payment, "Payment marked as paid");
};

