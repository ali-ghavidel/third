/// <reference types="cypress" />
var count = 0;
context("Hotel Filters", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  const citiesList = [
    {
      name: "اردبیل",
      state: "اردبیل",
      placeName: "شهر",
      link: "/ardabil-hotels/",
      id: 3,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 12,
      category: "city",
      country: "ایران",
      city: "اردبیل",
      labels: [],
    },
    {
      name: "تهران",
      state: "تهران",
      placeName: "شهر",
      link: "/tehran-hotels/",
      id: 19,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 179,
      category: "city",
      country: "ایران",
      city: "تهران",
      labels: [],
    },
    {
      name: "مشهد",
      state: "خراسان رضوی",
      placeName: "شهر",
      link: "/mashhad-hotels/",
      id: 54,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 355,
      category: "city",
      country: "ایران",
      city: "مشهد",
      labels: [],
    },
    {
      name: "اصفهان",
      state: "اصفهان",
      placeName: "شهر",
      link: "/isfahan-hotels/",
      id: 5,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 112,
      category: "city",
      country: "ایران",
      city: "اصفهان",
      labels: [],
    },
    {
      name: "شیراز",
      state: "فارس",
      placeName: "شهر",
      link: "/shiraz-hotels/",
      id: 37,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 118,
      category: "city",
      country: "ایران",
      city: "شیراز",
      labels: [],
    },
    {
      name: "یزد",
      state: "یزد",
      placeName: "شهر",
      link: "/yazd-hotels/",
      id: 59,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 108,
      category: "city",
      country: "ایران",
      city: "یزد",
      labels: [],
    },
    {
      name: "تبریز",
      state: "آذربایجان شرقی",
      placeName: "شهر",
      link: "/tabriz-hotels/",
      id: 17,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 44,
      category: "city",
      country: "ایران",
      city: "تبریز",
      labels: [],
    },
    {
      name: "کیش",
      state: "هرمزگان",
      placeName: "شهر",
      link: "/kish-hotels/",
      id: 46,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 56,
      category: "city",
      country: "ایران",
      city: "کیش",
      labels: [],
    },
    {
      name: "رشت",
      state: "گیلان",
      placeName: "شهر",
      link: "/rasht-hotels/",
      id: 25,
      type: 1,
      subtitle: null,
      grade: 0,
      count: 21,
      category: "city",
      country: "ایران",
      city: "رشت",
      labels: [],
    },
  ];

  const stars = [
    { count: "پنج", grade: "5" },
    { count: "چهار", grade: "4" },
    { count: "سه", grade: "3" },
    { count: "دو", grade: "2" },
    { count: "یک", grade: "1" },
  ];

    citiesList.forEach((city) => {
      describe(`Test filters for ${city.name}`, () => {
        beforeEach(() => {
          cy.visit(`https://iranhotelonline.com${city.link}`);
          cy.get("h1")
            .should("exist")
            .and("contain.text", `هتل های ${city.name}`);
        });
        
        stars.forEach((star) => {
          it(`should filter hotels with ${star.count} stars in ${city.name}`, () => {
              cy.get('#filters-sidebar iho-stars-filter ul li').then(($element)=>{
                  if ($element.find(`*:contains("${star.count}")`).length > 0) {
                      // کلیک روی فیلتر تعداد ستاره‌ها
                      cy.get("#filters-sidebar iho-stars-filter ul li")
                        .contains(star.count)
                        .click();

                      // بررسی اینکه فیلتر بر اساس تعداد ستاره اعمال شده است
                      cy.location("href").should("include", `grades=${star.grade}`);

                      // بررسی عنوان صفحه که شامل تعداد ستاره و نام شهر باشد
                      cy.get("h1")
                        .should("be.visible")
                        .and("contain.text", `${star.grade}`)
                        .and("contain.text", `${city.name}`);

                      // حذف فیلتر و بررسی
                      cy.get("#filters-sidebar iho-stars-filter ul li")
                        .contains(star.count)
                        .click();
                      cy.location("pathname").should(
                        "not.include",
                        `grades=${star.grade}`
                      );
                    }else{
                      cy.log( `there is no hotel with grade ${star.grade} in ${city.name}`)
                    }
              })

          });
        });
      });
    });
//   citiesList.forEach((city) => {
//     describe(`Test filters for ${city.name}`, () => {
//       beforeEach(() => {
//         cy.visit(`https://iranhotelonline.com${city.link}`);
//         cy.get("h1")
//           .should("exist")
//           .and("contain.text", `هتل های ${city.name}`);
//       });

//       stars.forEach((star) => {
//         it(`should filter hotels with ${star.count} stars in ${city.name}`, () => {
//           cy.get("#filters-sidebar iho-stars-filter ul li").each(($el,index) => {
//             cy.get("#filters-sidebar iho-stars-filter ul li").then(
//               ($element) => {
//                 if ($element.find(`*:contains("${star.count}")`).length > 0) {
//                   // کلیک روی فیلتر تعداد ستاره‌ها
//                   cy.get("#filters-sidebar iho-stars-filter ul li")
//                     .contains(star.count)
//                     .click();

//                   // بررسی اینکه فیلتر بر اساس تعداد ستاره اعمال شده است
//                 //   cy.location("href").should("include", `grades=${star.grade}`);

//                   // بررسی عنوان صفحه که شامل تعداد ستاره و نام شهر باشد
//                   cy.get("h1")
//                     .should("be.visible")
//                     .and("contain.text", `${star.grade}`)
//                     .and("contain.text", `${city.name}`);

//                   // اعمال فیلتر دوم (شما می‌توانید نوع دیگری از فیلتر را اعمال کنید)
//                   // به عنوان مثال، اگر شما فیلتر دیگری دارید، آن را اعمال کنید.
//                   // برای نمونه:
//                   cy.get("#filters-sidebar iho-stars-filter ul li")
//                     .children()
//                     .eq(index)
//                     .click();

//                   // بررسی h1
//                   cy.get("h1")
//                     .should("be.visible")
//                     .and("contain.text", `هتل های ${city.name}`);

//                   // حذف فیلتر و بررسی
//                   cy.get("#filters-sidebar iho-stars-filter ul li")
//                     .contains(star.count)
//                     .click();
//                   cy.location("pathname").should(
//                     "not.include",
//                     `grades=${star.grade}`
//                   );
//                 } else {
//                   cy.log(
//                     `there is no hotel with grade ${star.grade} in ${city.name}`
//                   );
//                 }
//               }
//             );
//           });
//         });
//       });
//     });
//   });
});
