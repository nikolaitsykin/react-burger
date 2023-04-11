/// <reference types="cypress" />
// @ts-check
import {
  _AUTH_BTN, _BUN,
  _CLOSE_BTN,
  _CONSTRUCTOR,
  _DETAILS_NAME,
  _EMAIL,
  _EMAIL_INPUT,
  _LOCAL_URL,
  _LOGIN_INPUT, _LOGIN_URL, _MAIN,
  _MODAL, _ORDERS_URL, _ORDER_BTN,
  _ORDER_NUMBER,
  _PASSWORD,
  _PASSWORD_INPUT
} from "../fixtures/constants";

describe("Constructor", () => {
  beforeEach(function () {
    cy.visit(_LOCAL_URL);
    cy.intercept("POST", `${_LOGIN_URL}`, {
      fixture: "auth.json",
    });
    cy.intercept("POST", `${_ORDERS_URL}`, {
      fixture: "order.json",
    });
  });
  it("should open modal after ingredient card click", () => {
    cy.get(_BUN).click();
  });
  it("should display ingredient details in modal", () => {
    cy.get(_BUN).click();
    cy.get(_MODAL).as("modal");
    cy.get("@modal").find(_DETAILS_NAME).as("name");
    cy.get("@name").should("contain", "Краторная булка N-200i");
  });
  it("should close modal after close button click", () => {
    cy.get(_BUN).click();
    cy.get(_CLOSE_BTN).click();
  });
  it("should drug ingredient to constructor", () => {
    cy.get(_BUN).as("bun");
    cy.get(_CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });
  it("should open modal with order after order button click", () => {
    cy.get(_BUN).as("bun");
    cy.get(_MAIN).as("main");
    cy.get(_CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get(_AUTH_BTN).click();
    cy.get(_EMAIL_INPUT).type(_EMAIL);
    cy.get(_PASSWORD_INPUT).type(_PASSWORD);
    cy.get(_LOGIN_INPUT).click();
    cy.get(_ORDER_BTN).click();
    cy.get(_MODAL).as("modal");
    cy.get("@modal").find(_ORDER_NUMBER).as("number");
    cy.get("@number").should("contain", "34429");
  });
  it("should close modal with order after close button click", () => {
    cy.get(_BUN).as("bun");
    cy.get(_MAIN).as("main");
    cy.get(_CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get(_AUTH_BTN).click();
    cy.get(_EMAIL_INPUT).type(_EMAIL);
    cy.get(_PASSWORD_INPUT).type(_PASSWORD);
    cy.get(_LOGIN_INPUT).click();
    cy.get(_ORDER_BTN).click();
    cy.get(_CLOSE_BTN).click();
  });
});
