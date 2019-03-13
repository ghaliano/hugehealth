<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StatController extends AbstractController
{
    /**
     * @Route("/api/doctor/stats", name="doctor_stats")
     */
    public function doctorStats(Request $request)
    {
        $sql = "SELECT distinct(u.id), 
            u.firstname, 
            u.lastname, u.id, 
            count(distinct r.id) as rdv_count , 
            count(distinct r.patient_id) as patient_count 
            FROM hugehealth.user u 
            left join rdv r on u.id = r.doctor_id
            group by u.id
        ";

        $stmt = $this
            ->getDoctrine()
            ->getEntityManager()
            ->getConnection()
            ->prepare($sql)
        ;
        $stmt->execute();
        $result = $stmt->fetchAll();

        return new JsonResponse(
            $result
        );
    }
    /**
     * @Route("/api/speciality/stats", name="speciality_stats")
     */
    public function specialityStats(Request $request)
    {
        $sql = "SELECT 
s.name, 
count(r.patient_id) as patient_count
FROM speciality s 
LEFT JOIN rdv r on s.id = r.speciality_id 
group by s.id";

        $stmt = $this
            ->getDoctrine()
            ->getEntityManager()
            ->getConnection()
            ->prepare($sql)
        ;
        $stmt->execute();
        $result = $stmt->fetchAll();

        return new JsonResponse(
            $result
        );
    }
}
