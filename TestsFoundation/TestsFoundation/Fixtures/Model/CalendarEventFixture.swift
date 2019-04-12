//
// Copyright (C) 2019-present Instructure, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import Foundation
@testable import Core

extension CalendarEventItem: Fixture {
    public static var template: Template {
        return [
            "id": "1",
            "contextRaw": "course_1",
            "title": "calendar event #1",
            "type": "event",
            "startAt": Date().addDays(-365),
            "endAt": Date().addDays(365),
            "htmlUrl": URL(string: "https://narmstrong.instructure.com/calendar?event_id=10&include_contexts=course_1")!,
        ]
    }
}
