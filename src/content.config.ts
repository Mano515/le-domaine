import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const menu = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/menu' }),
  schema: z.object({
    categorie: z.string(),
    ordre: z.number().default(0),
    plats: z.array(
      z.object({
        nom: z.string(),
        description: z.string().optional(),
        prix: z.string(),
      })
    ),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    heure: z.string().optional(),
    image: z.string().optional(),
    resume: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: z.object({
    image: z.string(),
    alt: z.string(),
    ordre: z.number().default(0),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/reviews' }),
  schema: z.object({
    auteur: z.string(),
    note: z.number().min(1).max(5),
    texte: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { menu, events, gallery, reviews };
