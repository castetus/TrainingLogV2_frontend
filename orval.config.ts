import { defineConfig } from 'orval';

export default defineConfig({
  trainingLog: {
    input: {
      target: 'http://localhost:3000/docs/json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/generated/model',
      client: 'axios',
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/api/orvalMutator.ts',
          name: 'orvalMutator',
        },
      },
    },
  },
});