import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.listItem()
                .title('About Page')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['homePage', 'aboutPage'].includes(listItem.getId()!)
      ),
    ]);

