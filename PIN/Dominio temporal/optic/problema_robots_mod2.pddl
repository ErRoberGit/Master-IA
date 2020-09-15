(define (problem problema_robots) (:domain dominio_robots)
    (:objects r1 - robot
              t1 t2 t3 - taza
              p1 p2 p3 - persona
              l1 l2 l3 l4 lp - lugar
              a1 - armario
              m1 - maquina
              b1 b2 - brazo
    )
    (:init
        (= (velocidad r1) 1)
        
        (at r1 l1)
        (at p1 l2)
        (at p2 l1)
        (at p3 l4)
        (at m1 l1)
        (at a1 l3)

        (on t1 a1)
        (on t2 a1)
        (on t3 a1)

        (linked l1 l2)
        (linked l2 l1)
        (= (distancia l1 l2) 2)
        (= (distancia l2 l1) 2)
        (linked l1 lp)
        (linked lp l1)
        (= (distancia l1 lp) 4)
        (= (distancia lp l1) 4)
        (linked l2 lp)
        (linked lp l2)
        (= (distancia l2 lp) 4)
        (= (distancia lp l2) 4)
        (linked l3 l4)
        (linked l4 l3)
        (= (distancia l3 l4) 2)
        (= (distancia l4 l3) 2)
        (linked l3 lp)
        (linked lp l3)
        (= (distancia l3 lp) 4)
        (= (distancia lp l3) 4)
        (linked l4 lp)
        (linked lp l4)
        (= (distancia l4 lp) 4)
        (= (distancia lp l4) 4)

        (allowed r1 l1)
        (allowed r1 l2)
		(allowed r1 l3)
		(allowed r1 l4)
        (allowed r1 lp)

        (empty t1)
        (empty t2)
        (empty t3)
        (= (peso t1) 1)
        (= (peso t2) 1)
        (= (peso t3) 1)

        (libre b1 r1)
        (libre b2 r1)
    )
    (:goal (and (on t1 p1) (on t2 p2) (on t3 p3) (full t1) (full t2) (full t3)))
    (:metric minimize (total-time))
)
