// @flow

import FavoritedCourseList from '../modules/courses/favorites/FavoritedCourseList'
import AllCourseList from '../modules/courses/all/AllCourseList'
import EditFavorites from '../modules/courses/edit-favorites/EditFavorites'
import CourseDetails from '../modules/courses/details/CourseDetails'
import CourseSettings from '../modules/courses/settings/CourseSettings'
import UserCoursePreferences from '../modules/courses/user-prefs/UserCoursePreferences'
import AssignmentList from '../modules/assignments/AssignmentList'
import AssignmentDetails from '../modules/assignment-details/AssignmentDetails'
import AssignmentDueDates from '../modules/assignment-due-dates/AssignmentDueDates'
import AssignmentDetailsEdit from '../modules/assignment-details/AssignmentDetailsEdit'
import Inbox from '../modules/inbox/Inbox'
import Compose from '../modules/inbox/Compose'
import CourseSelect from '../modules/inbox/CourseSelect'
import ConversationDetails from '../modules/inbox/detail/ConversationDetails'
import Profile from '../modules/profile/Profile'
import BetaFeedback from '../modules/beta-feedback/BetaFeedback'
import Staging from '../modules/staging/Staging'
import SubmissionList from '../modules/submissions/list/SubmissionList'
import SubmissionSettings from '../modules/submissions/list/SubmissionSettings'
import AssigneePicker from '../modules/assignee-picker/AssigneePicker'
import AssigneeSearch from '../modules/assignee-picker/AssigneeSearch'
import SpeedGrader from '../modules/speedgrader/SpeedGrader'
import RubricDescription from '../modules/speedgrader/RubricDescription'
import QuizzesList from '../modules/quizzes/list/QuizzesList'
import QuizDetails from '../modules/quizzes/details/QuizDetails'
import QuizEdit from '../modules/quizzes/edit/QuizEdit'
import RichTextEditor from '../modules/rich-text-editor/RichTextEditor'
import QuizPreview from '../modules/quizzes/details/QuizPreview'
import QuizSubmissions from '../modules/quizzes/submissions/QuizSubmissionList'
import CourseDetailsSplitViewPlaceholder from '../modules/courses/details/components/CourseDetailsSplitViewPlaceholder'
import DiscussionsList from '../modules/discussions/list/DiscussionsList'
import DiscussionDetails from '../modules/discussions/details/DiscussionDetails'
import DiscussionEdit from '../modules/discussions/edit/DiscussionEdit'
import AnnouncementsList from '../modules/announcements/list/AnnouncementsList'
import AnnouncementEdit from '../modules/announcements/edit/AnnouncementEdit'
import AttachmentView from '../common/components/AttachmentView'

import { Store } from 'redux'
import { registerScreen } from './'

export function wrap (name: any): Function {
  return () => name
}

export function registerScreens (store: Store): void {
  registerScreen('/', wrap(FavoritedCourseList), store)
  registerScreen('/courses', wrap(AllCourseList), store, { canBecomeMaster: true })
  registerScreen('/course_favorites', wrap(EditFavorites), store)
  registerScreen('/courses/:courseID', wrap(CourseDetails), store, { canBecomeMaster: true })
  registerScreen('/courses/:courseID/settings', wrap(CourseSettings), store)
  registerScreen('/courses/:courseID/user_preferences', wrap(UserCoursePreferences), store)
  registerScreen('/courses/:courseID/assignments', wrap(AssignmentList), store, { canBecomeMaster: true })
  registerScreen('/courses/:courseID/assignments/:assignmentID', wrap(AssignmentDetails), store)
  registerScreen('/courses/:courseID/assignments/:assignmentID/edit', wrap(AssignmentDetailsEdit), store)
  registerScreen('/courses/:courseID/assignments/:assignmentID/due_dates', wrap(AssignmentDueDates), store)
  registerScreen('/courses/:courseID/assignments/:assignmentID/submissions', wrap(SubmissionList), store)
  registerScreen('/courses/:courseID/assignments/:assignmentID/submission_settings', wrap(SubmissionSettings), store)
  registerScreen('/courses/:courseID/assignments/:assignmentID/submissions/:userID', wrap(SpeedGrader), store)
  registerScreen('/courses/:courseID/assignments/:assignmentID/rubrics/:rubricID/description', wrap(RubricDescription), store)
  registerScreen('/courses/:courseID/quizzes', wrap(QuizzesList), store, { canBecomeMaster: true })
  registerScreen('/courses/:courseID/quizzes/:quizID', wrap(QuizDetails), store)
  registerScreen('/courses/:courseID/quizzes/:quizID/preview', wrap(QuizPreview), store)
  registerScreen('/courses/:courseID/quizzes/:quizID/edit', wrap(QuizEdit), store)
  registerScreen('/courses/:courseID/quizzes/:quizID/submissions', wrap(QuizSubmissions), store)
  registerScreen('/courses/:courseID/discussion_topics', wrap(DiscussionsList), store, { canBecomeMaster: true })
  registerScreen('/courses/:courseID/discussion_topics/new', wrap(DiscussionEdit), store)
  registerScreen('/courses/:courseID/discussion_topics/:discussionID', wrap(DiscussionDetails), store)
  registerScreen('/courses/:courseID/discussion_topics/:discussionID/edit', wrap(DiscussionEdit), store)
  registerScreen('/conversations', wrap(Inbox), store, { canBecomeMaster: true })
  registerScreen('/conversations/:conversationID', wrap(ConversationDetails), store)
  registerScreen('/conversations/compose', wrap(Compose), store)
  registerScreen('/conversations/course-select', wrap(CourseSelect), store)
  registerScreen('/conversations/:conversationID', wrap(ConversationDetails), store)
  registerScreen('/profile', wrap(Profile), store)
  registerScreen('/beta-feedback', wrap(BetaFeedback), store)
  registerScreen('/staging', wrap(Staging), store)
  registerScreen('/rich-text-editor', wrap(RichTextEditor), store)
  registerScreen('/attachment', wrap(AttachmentView), store)
  registerScreen('/courses/:courseID/placeholder', wrap(CourseDetailsSplitViewPlaceholder), store)
  registerScreen('/courses/:courseID/announcements', wrap(AnnouncementsList), store)
  registerScreen('/courses/:courseID/announcements/new', wrap(AnnouncementEdit), store)
  registerScreen('/courses/:courseID/announcements/:announcementID/edit', wrap(AnnouncementEdit), store)

  // This will never actually be routed to, but this makes it really easy to debug
  registerScreen('/courses/:courseID/assignee-picker', wrap(AssigneePicker), store)
  registerScreen('/courses/:courseID/assignee-search', wrap(AssigneeSearch), store)
}
