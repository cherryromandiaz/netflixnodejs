const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' }); // Replace with your Elasticsearch instance URL

const createIndex = async (indexName) => {
  const exists = await client.indices.exists({ index: indexName });
  if (!exists.body) {
    await client.indices.create({ index: indexName });
  }
};

const indexDocument = async (indexName, document) => {
  await client.index({
    index: indexName,
    body: document,
  });
};

const searchDocuments = async (indexName, query, filters) => {
  const response = await client.search({
    index: indexName,
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: query,
                fields: ['title^3', 'description', 'genre', 'actors', 'director'],
              },
            },
          ],
          filter: filters.map((filter) => ({
            term: filter,
          })),
        },
      },
    },
  });
  return response.hits.hits.map((hit) => hit._source);
};

module.exports = { createIndex, indexDocument, searchDocuments };
