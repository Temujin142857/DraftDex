import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { rosterToJSON } from "./Composables/useRosters";

export function NavigateToMatchup({ rostersSelected, path }) {
  const navigate = useNavigate();
  const param = [rosterToJSON(rostersSelected[0]), rosterToJSON(rostersSelected[1])];
  useEffect(() => {
    navigate(path, { state: { param } });
  }, [navigate, path, rostersSelected]);

  return null;
}

export function NavigateBackwards({ data, path }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path, { state: { data }, replace: true });
  }, [navigate, path, data]);
  return null;
}

export function NavigateForwards({ data, path }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path, { state: { data }, replace: false });
  }, [navigate, path, data]);
  return null;
}
