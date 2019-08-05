const by = require('sort-by');
const ellipsize = require('ellipsize');

module.exports = (dato, root) => {
  root.directory('data/', dir => {
    dir.createDataFile('home.toml', 'toml', {
      sitename: dato.homepage.siteName,
      tagline: dato.homepage.tagLine,
      description: dato.homepage.description
    });
  });

  root.directory('content/pastevent', dir => {
    dato.pastevents.forEach(pastevent => {
      dir.createPost(
        `${pastevent.slug()}.md`, 'yaml', {
          frontmatter: {
            title: pastevent.name,
            imageurl: pastevent.image.url({ w: 400}),
            thumbnailurl: pastevent.image.url({ h: 300 }),
            bgurl: pastevent.image.url({ w: 5}),
            weight: pastevent.position,
            excerpt: ellipsize(pastevent.overview, 150),
          },
          content: pastevent.overview,
        }
      );
    });
  });

  root.directory('content/character', dir => {
    dato.characters.forEach(character => {
      dir.createPost(`${character.slug()}.md`, 'toml', {
        frontmatter: {
          title: character.name,
          actorname: character.actorName,
          episodes: character.episode,
          weight: character.position,
          thumbnailurl: character.image.url({ fit: 'crop', crop: 'faces', w: 200, h: 200 }),
          imageurl: character.image.url({ w: 500, fm: 'jpg' }),
        },
        content: character.description,
      });
    });
  });

  root.addToDataFile('config.toml', 'toml', { title: dato.homepage.siteName });
}
