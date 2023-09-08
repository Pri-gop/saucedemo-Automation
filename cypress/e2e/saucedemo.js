///<reference types="Cypress" />

describe("Testcases for Homepage Saucedemo", function() {

    
    it("test assertions for Swag labs", function(){
        cy.visit("https://www.saucedemo.com/");
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
    
    cy.get("div.app_logo").should("have.text","Swag Labs")
    cy.get("#react-burger-menu-btn").should("be.visible")
    cy.get("a.shopping_cart_link").should("be.visible")
    cy.get("span.title").should("have.text","Products")
    cy.get("select.product_sort_container").should("be.visible")
    cy.get(':nth-child(2) > :nth-child(1) > #inventory_container').should("be.visible")
    cy.get(".inventory_item").should("have.length",6).each(($e1, index) => {
        cy.get("div.inventory_item_img").should("be.visible")
        cy.get("div.inventory_item_description").should("be.visible").find("div.pricebar").should("be.visible")
        })
        // functions for converting text like $1.99 into a float
        function convertPrice(s) {
            return parseFloat(s.replace('$', ''))
          }
          //function to convert an array of prices into an array of floats
          function convertPrices(list) {
            return list.map(convertPrice)
          }

        cy.get("select").select("lohi")
        //testing is the price sorted from low to high
        cy.get(".inventory_item_description > .pricebar > .inventory_item_price").each(($elements) => {
            return Cypress._.map($elements, (priceElement) => {

                const $price = Cypress.$(priceElement).clone()
                return $price.text().trim()
            }).then(convertPrices).should('be.sorted')
        })   

        cy.get("select").select("hilo")
        //testing is the price sorted from high to low
        cy.get(".inventory_item_description > .pricebar > .inventory_item_price").each(($elements) => {
            return Cypress._.map($elements, (priceElement) => {

                const $price = Cypress.$(priceElement).clone()
                return $price.text().trim()
            }).then(convertPrices).expect($price).to.be.sorted({descending: true})
        })  
        //testing is the products sorted from A to Z
        cy.get("select").select("az")
        var val;
        cy.get(".inventory_item_description > .inventory_item_label > .inventory_item_name").each(($list) => {
        
          return val = [] + cy.wrap($list)
        })
        expect(val).to.be.sorted()
        //testing is the products sorted from Z to A
        cy.get("select").select("za")
        cy.get(".inventory_item_description > .inventory_item_label > .inventory_item_name").each(($list) => {
        
            return val = [] + cy.wrap($list)
          })
          expect(val).to.be.sorted({descending: true})
        
        //testing the footer 
        cy.get('.footer').should("be.visible")
        cy.get('.footer_copy').contains("Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy")
        cy.get('.social').should('exist').find('li').should('have.length', 3).each(($list) => {
        
            cy.wrap($list).should(($link) => {
                expect($link).to.have.attr('href');
              })
            .invoke('attr', 'href') // Get the href attribute value
            .then((href) => {
                expect(href).to.include('sauce'); 
            })
            })
    }); 

}); 

/* */