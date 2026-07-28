import { useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useCourseStore } from '@/stores/courseStore';
import { useUserStore } from '@/stores/userStore';
import { useProgressStore } from '@/stores/progressStore';

export function FirebaseSync() {
  useEffect(() => {
    let isUpdatingFromFirebase = false;

    // Helper to safely update store without triggering push back to Firebase
    const safeUpdate = (store: any, data: any) => {
      isUpdatingFromFirebase = true;
      store.setState(data);
      // Reset flag after state listeners have run
      setTimeout(() => { isUpdatingFromFirebase = false; }, 100);
    };

    // 1. Sync Courses
    const coursesRef = ref(db, 'store_courses');
    const unsubscribeCourses = onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        safeUpdate(useCourseStore, {
          courses: data.courses || [],
          chapters: data.chapters || [],
          lessons: data.lessons || [],
          tests: data.tests || [],
          questions: data.questions || []
        });
      } else {
        const state = useCourseStore.getState();
        set(coursesRef, {
          courses: state.courses,
          chapters: state.chapters,
          lessons: state.lessons,
          tests: state.tests,
          questions: state.questions
        });
      }
    });

    const unsubCoursesLocal = useCourseStore.subscribe((state) => {
       if (isUpdatingFromFirebase) return;
       set(coursesRef, {
          courses: state.courses,
          chapters: state.chapters,
          lessons: state.lessons,
          tests: state.tests,
          questions: state.questions
       });
    });

    // 2. Sync Users
    const usersRef = ref(db, 'store_users');
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        safeUpdate(useUserStore, { users: data.users || [] });
      } else {
        set(usersRef, { users: useUserStore.getState().users });
      }
    });

    const unsubUsersLocal = useUserStore.subscribe((state) => {
       if (isUpdatingFromFirebase) return;
       set(usersRef, { users: state.users });
    });

    // 3. Sync Progress
    const progressRef = ref(db, 'store_progress');
    const unsubscribeProgress = onValue(progressRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        safeUpdate(useProgressStore, {
          courseProgress: data.courseProgress || {},
          lessonProgress: data.lessonProgress || {},
          testResults: data.testResults || {}
        });
      } else {
        const state = useProgressStore.getState();
        set(progressRef, {
          courseProgress: state.courseProgress,
          lessonProgress: state.lessonProgress,
          testResults: state.testResults
        });
      }
    });

    const unsubProgressLocal = useProgressStore.subscribe((state) => {
       if (isUpdatingFromFirebase) return;
       set(progressRef, {
          courseProgress: state.courseProgress,
          lessonProgress: state.lessonProgress,
          testResults: state.testResults
       });
    });

    return () => {
      unsubscribeCourses();
      unsubCoursesLocal();
      unsubscribeUsers();
      unsubUsersLocal();
      unsubscribeProgress();
      unsubProgressLocal();
    };
  }, []);

  return null;
}
