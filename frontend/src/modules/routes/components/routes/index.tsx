"use-client";

import { useEffect, useState } from "react";

import { useRoutesMutation } from "@/modules/routes/hooks/use-mutation";
import { GradientLoader } from "@/shared/components/gradient-loader";
import { useRoutesStore } from "@/shared/stores/routes.store";
import { Box } from "@mui/material";

import { IPlace } from "@/api/services/types";

import { PlaceCard } from "../place-card";
import { styles } from "./styles";

export const Routes = () => {
  const sessionId = useRoutesStore((s) => s.sessionId);
  const { createRoute, isLoading } = useRoutesMutation();
  const [places, setPlaces] = useState<IPlace[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    createRoute(sessionId, {
      onSuccess: (data) => {
        setPlaces(data.places);
      },
    });
  }, [sessionId]);

  return (
    <Box sx={styles.wrapper}>
      {isLoading ? (
        <GradientLoader size={80} />
      ) : (
        <>
          {/* {places.map((place) => (
            <Box key={place.id}>
              <div>{place.name}</div>
            </Box>
          ))} */}
          {places.length > 0 && <PlaceCard place={places[0]} />}
        </>
      )}
    </Box>
  );
};
