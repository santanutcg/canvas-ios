//
// This file is part of Canvas.
// Copyright (C) 2017-present  Instructure, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//

// @flow

import { Reducer } from 'redux'
import Actions from './actions'
import { handleActions } from 'redux-actions'
import handleAsync from '../../../utils/handleAsync'

const { refreshQuizSubmissions } = Actions

export const quizSubmissions: Reducer<SubmissionsState, any> = handleActions({
  [refreshQuizSubmissions.toString()]: handleAsync({
    resolved: (state, { result }) => {
      const incoming = result.data.quiz_submissions
        .reduce((incoming, submission) => ({
          ...incoming,
          [submission.id]: {
            data: submission,
            pending: 0,
            error: null,
          },
        }), {})
      return { ...state, ...incoming }
    },
  }),
}, {})

export const quizAssignmentSubmissions: Reducer<SubmissionsState, any> = handleActions({
  [refreshQuizSubmissions.toString()]: handleAsync({
    resolved: (state, { result }) => {
      const incoming = result.data.submissions
        .reduce((incoming, submission) => ({
          ...incoming,
          [submission.id]: {
            submission,
            pending: 0,
            error: null,
          },
        }), {})
      return { ...state, ...incoming }
    },
  }),
}, {})
