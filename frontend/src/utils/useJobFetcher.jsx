import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, lazyLoadJobs } from "../store/actions/JobActions";

const LIMIT = 9;

const useJobFetcher = () => {
  const dispatch = useDispatch();
  const { jobs, total } = useSelector((state) => state.job);
  const [query, setQuery] = useState("");
  const [hasMore, sethasMore] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  // Initial jobs fetch on first load or search change
   useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchJobs({ search: query, start: 0, limit: LIMIT }));
      sethasMore(true);
      setisLoading(false);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [dispatch, query]);

  

  // Infinite scroll handler
 const fetchMoreJobs = useCallback(async () => {
  if (!hasMore || isLoading) return;

  const currentCount = jobs.length;

  setisLoading(true);

  try {
    const resultAction = await dispatch(
      lazyLoadJobs({ start: currentCount, search: query, limit: LIMIT })
    );

    const newJobs = resultAction.payload?.jobs || [];
    const totalCount = resultAction.payload?.total || 0;
    sethasMore(currentCount + newJobs.length < totalCount);
  } catch (err) {
    console.error("❌ Fetch more jobs failed:", err);
    sethasMore(false);
  } finally {
    setisLoading(false);
  }
}, [dispatch, jobs, total, hasMore, isLoading, query]);


  return {
    jobs,
    filteredJobs: jobs,
    query,
    setQuery,
    fetchMoreJobs,
    hasMore,
    isLoading,
  };
};

export default useJobFetcher;
