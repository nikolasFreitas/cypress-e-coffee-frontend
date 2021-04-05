/// <reference types="cypress" />
import enTranslation from '../../fixtures/en.json';
import ptTranslation from '../../fixtures/pt-br.json';

context('#Home-page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/e-coffee-frontend')
  })


  describe('##banner section', () =>{
    describe('###static check', () => {
      it('- should have an image', () => {
        cy.get('[data-testid="home-banner-image"]').should('have.attr', 'src')
      })

      it('- should have a title', () => {
        cy
          .get('[data-testid="home-banner-caption-title"')
          .contains(enTranslation.banners[0].title)
      });

      it('- should have a subtitle', () => {
        cy
          .get('[data-testid="home-banner-caption-subtitle"')
          .contains(enTranslation.banners[0].subtitle);
      });
    });

    describe('###behavioral - translation', () => {
      beforeEach(() => {
        cy
          .get('[data-testid="language-selector"]')
          .select('pt-br');
      })
      it('- should translate to portuguese the title', () => {
        cy
          .get('[data-testid="home-banner-caption-title"')
          .contains(ptTranslation.banners[0].title)
      });

      it('- should translate to portuguese the subtitle', () => {
        cy
          .get('[data-testid="home-banner-caption-subtitle"')
          .contains(ptTranslation.banners[0].subtitle);
      });
    });
  })

  describe('##store section', () => {
    describe('###static check', () => {
      it('- should have a store with list', () => {
        const storeContainer = cy.get('[data-testid="store-list-container"]');
        const numOfSections = 3;
        storeContainer
          .children('.row')
          .its('length')
          .should('equal', numOfSections);
      });

      it('- should have a title in store section', () => {
        const storeTitle = cy.get('[data-testid="store-list-title"]');
        expect(storeTitle.contains(enTranslation.shops.title));
      });

      it('- Should have 8 items in store', () => {
        const storeItems = cy.get('[data-testid="store-item"]');
        const expectedItems = 8;
        storeItems
          .its('length')
          .should('equal', expectedItems);
      });

      it('- should have title of item rating equal of badges', () => {
        const ratingBoxList = cy.get('[data-testid="rating-container"]');
        const activeDatatestid = '[data-testid="rating-badge-true"]';

        ratingBoxList.each(ratingBox => {
          const title = ratingBox.attr('title');

          const rateBadgeList = ratingBox.children(activeDatatestid);
          const activeBadgeLength = rateBadgeList.length;

          //Replace the letters
          const rateNumberInTitle = title.replace(/[A-z]/g, '');
          //Match the rounded value of rate number in title (to integger) with activeBadgeLength (integger)
          expect(activeBadgeLength).to.be.equal(Math.round(rateNumberInTitle));
        })
      });
    });

    describe('###behavioral - translation', () => {
      beforeEach(() => {
        cy
          .get('[data-testid="language-selector"]')
          .select('pt-br');
      })

      it('- should translate to portuguese the title in store section', () => {
        const storeTitle = cy.get('[data-testid="store-list-title"]');
        expect(storeTitle.contains(ptTranslation.shops.title));
      });
    })
  })

  describe('##recomended section', () => {
    describe('###static check', () => {
      it('- should have a title', () => {
        // Contain a text inside
        cy
          .get('[data-testid="recomended-section-title"')
          .contains(enTranslation.recomendations.title);
      });

      it('- should have 4 products', () => {
        const recommendedQtd = 4;

        cy
          .get('[data-testid="product-item"]')
          .its('length')
          .should('equal', recommendedQtd)
      });
    });
  });
})
