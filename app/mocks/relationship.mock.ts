import { Relationship } from "../models/Relationship"

export const MOCK_RELATIONSHIP_SAMY: Relationship = {
  id: 1,
  name: 'Samy',
}

export const MOCK_RELATIONSHIP_FLO: Relationship = {
  id: 2,
  name: 'Flo',
}

export const MOCK_GET_RELATIONSHIPS = {
  data: [MOCK_RELATIONSHIP_SAMY, MOCK_RELATIONSHIP_FLO],
  status: 200
}

export const MOCK_GET_RELATIONSHIP = {
  data: MOCK_RELATIONSHIP_SAMY,
  status: 200
}