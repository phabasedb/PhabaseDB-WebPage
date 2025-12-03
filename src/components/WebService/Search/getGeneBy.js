// standard

// third party
import { gql } from "@apollo/client";

// local

export const GET_GENE_BY_DATATABLE = gql`
  query GetGeneBy(
    $properties: [String]
    $search: String
    $fullMatchOnly: Boolean
  ) {
    getGeneBy(
      properties: $properties
      search: $search
      fullMatchOnly: $fullMatchOnly
    ) {
      data {
        _id
        gene {
          accessionId
          name
          start
          end
        }
        chromosome {
          name
        }
        organism {
          _id
          name
        }
      }
    }
  }
`;

export const GET_GENE_BY_ID = gql`
  query GetGeneBy(
    $properties: [String]
    $search: String
    $fullMatchOnly: Boolean
  ) {
    getGeneBy(
      properties: $properties
      search: $search
      fullMatchOnly: $fullMatchOnly
    ) {
      data {
        _id
        gene {
          name
          accessionId
          start
          end
          strand
          sequence
          length
          description
        }
        chromosome {
          _id
          name
          type
        }
        organism {
          _id
          name
        }
        transcripts {
          _id
          accessionId
          start
          end
          strand
          sequence
          length
          product {
            aminoacidSequence
            sequence
          }
          utrs {
            start
            end
            sequence
            type
          }
          exons {
            start
            end
            sequence
            type
          }
          cds {
            start
            end
            sequence
            type
          }
        }
      }
    }
  }
`;
