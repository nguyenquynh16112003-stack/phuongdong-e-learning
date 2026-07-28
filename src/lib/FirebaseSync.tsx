import { useEffect } from 'react';
import { ref, onValue, set, get } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useCourseStore } from '@/stores/courseStore';
import { useUserStore } from '@/stores/userStore';
import { useProgressStore } from '@/stores/progressStore';

export function FirebaseSync() {
  useEffect(() => {
    let isUpdatingFromFirebase = false;
    let coursesLoaded = false;
    let usersLoaded = false;
    let progressLoaded = false;

    const safeUpdate = (store: any, data: any) => {
      isUpdatingFromFirebase = true;
      store.setState(data);
      setTimeout(() => { isUpdatingFromFirebase = false; }, 100);
    };

    const coursesRef = ref(db, 'store_courses');
    const unsubscribeCourses = onValue(coursesRef, (snapshot) => {
      coursesLoaded = true;
      const data = snapshot.val();
      if (data) {
        safeUpdate(useCourseStore, {
          courses: data.courses || [],
          chapters: data.chapters || [],
          lessons: data.lessons || [],
          tests: data.tests || [],
          questions: data.questions || []
        });
      }
    });

    const unsubCoursesLocal = useCourseStore.subscribe((state) => {
       if (!coursesLoaded || isUpdatingFromFirebase) return;
       set(coursesRef, {
          courses: state.courses,
          chapters: state.chapters,
          lessons: state.lessons,
          tests: state.tests,
          questions: state.questions
       });
    });

    const usersRef = ref(db, 'store_users');
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      usersLoaded = true;
      const data = snapshot.val();
      if (data) {
        safeUpdate(useUserStore, { users: data.users || [] });
      }
    });

    const unsubUsersLocal = useUserStore.subscribe((state) => {
       if (!usersLoaded || isUpdatingFromFirebase) return;
       set(usersRef, { users: state.users });
    });

    const progressRef = ref(db, 'store_progress');
    const unsubscribeProgress = onValue(progressRef, (snapshot) => {
      progressLoaded = true;
      const data = snapshot.val();
      if (data) {
        safeUpdate(useProgressStore, {
          courseProgress: data.courseProgress || {},
          lessonProgress: data.lessonProgress || {},
          testResults: data.testResults || {}
        });
      }
    });

    const unsubProgressLocal = useProgressStore.subscribe((state) => {
       if (!progressLoaded || isUpdatingFromFirebase) return;
       set(progressRef, {
          courseProgress: state.courseProgress,
          lessonProgress: state.lessonProgress,
          testResults: state.testResults
       });
    });

    // Helper to seed empty DB
    const seedIfEmpty = async () => {
      const snap = await get(coursesRef);
      if (!snap.val()) {
         const state = useCourseStore.getState();
         set(coursesRef, {
            courses: state.courses, chapters: state.chapters, lessons: state.lessons, tests: state.tests, questions: state.questions
         });
      }
    };
    seedIfEmpty();

    return () => {
      unsubscribeCourses(); unsubCoursesLocal();
      unsubscribeUsers(); unsubUsersLocal();
      unsubscribeProgress(); unsubProgressLocal();
    };
  }, []);

  return null;
}
