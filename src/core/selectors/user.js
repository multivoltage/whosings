import { createSelector } from 'reselect'

export const currentUserSelector = state => state.user;

export const loginLayerActiveSelector = createSelector(
  currentUserSelector,
  (user) => user.loginLayerActive
)
