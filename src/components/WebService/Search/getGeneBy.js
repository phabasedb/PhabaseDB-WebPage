// standard

// third party
import { gql } from "@apollo/client";

// local

export const GET_GENE_BY_DATATABLE = gql`
  query GetGeneBy($search: String) {
    getGeneBy(search: $search) {
      data {
        _id
        gene {
          accessionId
          name
          startPosition
          endPosition
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

export const GET_GENE_BY_ACCESSONID = gql`
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
          startPosition
          endPosition
          strand
          sequence
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
          startPosition
          endPosition
          sequence
          product {
            aminoacidSequence
            sequence
          }
          utrs {
            startPosition
            endPosition
            sequence
            type
          }
          exons {
            startPosition
            endPosition
            sequence
            type
          }
          cds {
            startPosition
            endPosition
            sequence
            type
          }
        }
      }
    }
  }
`;
