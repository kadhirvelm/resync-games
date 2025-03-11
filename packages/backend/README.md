# Backend
TBD

# Scaling
In order to get this to properly scale, we need an nginx config (or some balancer equivalent) that can route clients back to the same instance so our in memory cache of the state can be relevant + the websockets can send the update out.

We can separate out the non-game routes from the game routes, then route traffic based on the game ID to an according box. See the image for details. We can start with even vs. odd, then divisible by 3, 4, etc.

![Scaling](https://github.com/user-attachments/assets/3b9d2d82-3d0f-4be9-a5bd-0047e7388e37)
