describe("Admin Product Form", () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200/admin");
    });
  
    it("Should display the product form", () => {
      cy.contains("Agregar o modificar producto").should("exist");
      cy.get("form").should("exist");
  
      cy.get("#reference").should("exist");
      cy.get("#name").should("exist");
      cy.get("#price").should("exist");
      cy.get("#description").should("exist");
      cy.get("#type").should("exist");
      cy.get("#offer").should("exist");
      cy.get("#image").should("exist");
      cy.get("button[type='submit']").should("contain", "AGREGAR PRODUCTO");
    });
  
    it("Should show validation errors when submitting empty form", () => {
      cy.get("button[type='submit']").click();
  
      cy.get(".error-message").should("contain", "El nº de referencia es un campo obligatorio");
      cy.get(".error-message").should("contain", "El nombre del producto es obligatorio");
      cy.get(".error-message").should("contain", "El precio debe ser un número válido");
      cy.get(".error-message").should("contain", "La descripción es obligatoria");
    });
  
    it("Should not accept invalid price", () => {
      cy.get("#price").type("-10").blur();
      cy.get(".error-message").should("contain", "El precio no puede ser menor a 0.1");
  
      cy.get("#price").clear().type("100000").blur();
      cy.get(".error-message").should("contain", "El precio no puede ser mayor a 99,999");
    });
  
    it("Should submit the form with valid inputs", () => {
      // Interceptamos el POST
      cy.intercept("POST", "http://localhost:3000/api/products", {
        statusCode: 200,
        body: { message: "Producto agregado correctamente" }
      }).as("postProduct");
  
      cy.get("#reference").type("REF123");
      cy.get("#name").type("Zapatillas Pro Max");
      cy.get("#price").type("99.99");
      cy.get("#description").type("Zapatillas ligeras de running");
      cy.get("#type").select("calzado");
      cy.get("#offer").check();
  
      // Simular selección de imagen (fake file)
      const fileName = "example.jpg";
      cy.fixture(fileName).then(fileContent => {
        cy.get("#image").attachFile({
          fileContent: fileContent.toString(),
          fileName: fileName,
          mimeType: "image/jpeg"
        });
      });
  
      cy.get("button[type='submit']").click();
  
      cy.wait("@postProduct").its("response.statusCode").should("eq", 200);
    });
  
    it("Should load product data in update mode", () => {
      cy.intercept("GET", "http://localhost:3000/api/products/1", {
        statusCode: 200,
        body: {
          productid: 1,
          productname: "Chaqueta Winter",
          price: 59.99,
          description: "Chaqueta para invierno",
          type: "chaqueta",
          offer: true,
          image: ""
        }
      }).as("getProduct");
  
      cy.visit("http://localhost:4200/admin?action=update&productoId=1");
  
      cy.wait("@getProduct");
  
      cy.get("#reference").should("have.value", "1");
      cy.get("#name").should("have.value", "Chaqueta Winter");
      cy.get("#price").should("have.value", "59.99");
      cy.get("#description").should("have.value", "Chaqueta para invierno");
      cy.get("#type").should("have.value", "chaqueta");
      cy.get("#offer").should("be.checked");
    });
  });
  