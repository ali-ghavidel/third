/// <reference types="cypress" />

context('Product List Page', () => {
    let citiesList = [];

    // تنظیم نمایشگر قبل از تست‌ها
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    it('Dynamically generates test cases for each city', function () {
        cy.fixture('states.json').then((citiesList) => {
            citiesList.forEach((city) => {
                cy.fixture('globals.json').then((globals) => {
                    cy.visit(`https://iranhotelonline.com${city.link}`);
                    cy.log(`Current City: ${city.name}`);

                    // منتظر بمانید تا مطمئن شوید صفحه بارگذاری شده است
                    cy.get('h1').should('exist').invoke('text').should('eq', `هتل های ${city.name}`);

                    cy.get('#filters-sidebar iho-stars-filter ul li').each(($el) => {
                        let ts = '';

                        cy.wrap($el).within(() => {
                            // استخراج متن تعداد ستاره‌ها
                            cy.contains('ستاره').children().eq(0).invoke('text').as('ts');

                            // کلیک روی فیلتر
                            cy.get('label').contains('ستاره').click().then(() => {
                                cy.get('@ts').then((ts) => {
                                    cy.log('ts is: ' + ts);

                                    // بررسی وجود هر ستاره و مطابقت با لینک صفحه
                                    if (ts.includes('پنج')) {
                                        cy.location('href').should('include', 'grades=5');
                                        cy.document().find('h1', { includeShadowDom: true })
                                            .should('include.text', '5')
                                            .and('include.text', city.name);
                                    } else if (ts.includes('چهار')) {
                                        cy.get('h1').should('include.text', '4').and('include.text', city.name);
                                    } else if (ts.includes('سه')) {
                                        cy.get('h1').should('include.text', '3').and('include.text', city.name);
                                    } else if (ts.includes('دو')) {
                                        cy.get('h1').should('include.text', '2').and('include.text', city.name);
                                    } else if (ts.includes('یک')) {
                                        cy.get('h1').should('include.text', '1').and('include.text', city.name);
                                    }
                                });
                            });

                            // حذف فیلتر و بررسی
                            cy.get('label').contains('ستاره').click().then(() => {
                                cy.location('pathname').should('not.include', 'grades=5');
                            });
                        });
                    });
                });
            });
        });
    });
});
