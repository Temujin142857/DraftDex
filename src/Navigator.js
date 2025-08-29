import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export function NavigateToMatchup({ rostersSelected, path }) {
  const navigate = useNavigate();
  const param = [rostersSelected[0].toJSON(), rostersSelected[1].toJSON()];
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
