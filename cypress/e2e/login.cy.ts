describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200/login");
    });
  
    it("Should display the login form", () => {
      cy.contains("Login").should("exist");
      cy.get("h1").contains("Login").should("be.visible");
      cy.get("input[formControlName='emailFormControl']").should("be.visible");
      cy.get("input[formControlName='textViewContrasenya']").should("be.visible");
      cy.get("button[type='submit']").contains("Iniciar sesión").should("be.visible");
    });
  
    it("Should show validation errors for empty fields", () => {
      cy.get("input[formControlName='emailFormControl']").focus().blur();
      cy.get("input[formControlName='textViewContrasenya']").focus().blur();
      cy.get("mat-error").should("contain", "Email is required");
    });
  
    it("Should show an error for invalid email", () => {
        cy.get("input[formControlName='emailFormControl']").type("invalid-email");
        cy.get("input[formControlName='emailFormControl']").blur(); // obligamos el blur para disparar la validación
      
        // Esperamos a que el mat-error aparezca
        cy.get("mat-error").should("contain", "Please enter a valid email address");
      });
      
  
    it("Should allow login with valid credentials", () => {
      cy.intercept("POST", "http://127.0.0.1:3000/api/users/login", {
        statusCode: 200,
        body: {
          usuario: {
            userrole: "admin",
            userid: "12345",
          },
        },
      }).as("loginRequest");
  
      cy.get("input[formControlName='emailFormControl']").type("toni@gmail.com", { force: true });
      cy.get("input[formControlName='textViewContrasenya']").type("1234", { force: true });
      cy.get("button[type='submit']").click();
  
      cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
      cy.window().its("sessionStorage").invoke("getItem", "idUsuario").should("eq", "12345");
    });
  
    it("Should show an error for incorrect login credentials", () => {
      cy.intercept("POST", "http://127.0.0.1:3000/api/users/login", {
        statusCode: 401,
        body: { message: "Credenciales incorrectas" },
      }).as("failedLogin");
  
      cy.get("input[formControlName='emailFormControl']").type("user@example.com", { force: true });
      cy.get("input[formControlName='textViewContrasenya']").type("wrongpassword", { force: true });
      cy.get("button[type='submit']").click();
  
      cy.wait("@failedLogin");
      cy.contains("Credenciales incorrectas").should("be.visible");
    });
  });
  