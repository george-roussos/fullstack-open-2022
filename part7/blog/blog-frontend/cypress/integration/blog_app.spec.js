describe("blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("myuser");
    cy.get("#password").type("12345");
    cy.get("#login-button").click();

    cy.contains("myuser logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("myuser");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("add new blog").click();
      cy.get("#title").type("a note created by cypress");
      cy.get("#author").type("george");
      cy.get("#url").type("dummy");
      cy.get("#add-button").click();
      cy.contains("a note created by cypress");
    });

    it("a blog can be liked", function () {
      cy.contains("show details").click();
      cy.contains("like").click();
    });
  });
});
