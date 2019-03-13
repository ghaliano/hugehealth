<?php

namespace App\DataFixtures;

use App\Entity\Rdv;
use App\Entity\Speciality;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use App\DataFixtures\UserFixtures;
class RdvFixtures extends Fixture implements DependentFixtureInterface
{
    public const RDV_REFERENCE = 'rdv';

    public function load(ObjectManager $manager)
    {
        $rdvs = [
            ['start_at' => new \DateTime('2018-10-10'), 'address' => 'Regus lac', 'status' => $this->getRandomStatus(), 'type' => RDV::HOME_TYPE, 'doctor' => $this->getRandomDoctor(), 'patient' => $this->getRandomPatient()],
            ['start_at' => new \DateTime('2019-10-10'), 'address' => 'Regus lac2', 'status' => $this->getRandomStatus(), 'type' => RDV::OFFICE_TYPE, 'doctor' => $this->getRandomDoctor(), 'patient' => $this->getRandomPatient()],
            ['start_at' => new \DateTime('2020-10-10'), 'address' => 'Regus lac3', 'status' => $this->getRandomStatus(), 'type' => RDV::HOME_TYPE, 'doctor' => $this->getRandomDoctor(), 'patient' => $this->getRandomPatient()]
        ];
        foreach ($rdvs as $data) {
            $rdv = new Rdv();
            $rdv->setStartAt($data['start_at']);
            $rdv->setAddress($data['address']);
            $rdv->setStatus($data['status']);
            $rdv->setType($data['type']);
            $rdv->setDoctor($data['doctor']);
            $rdv->setPatient($data['patient']);
            $rdv->setSpeciality($this->getRandomSpecialityFromDoctor($data['doctor']));

            $manager->persist($rdv);
            $manager->flush();
        }
    }

    private function getRandomStatus()
    {
        return $this->getReference(
            StatusFixtures::STATUS_REFERENCE
            . rand(0, count(StatusFixtures::STATUS) - 1));

    }

    private function getRandomDoctor()
    {
        return $this->getReference(
            UserFixtures::DOCTOR_REFERENCE
            . rand(0, UserFixtures::DOCTORS_COUNT - 1));
    }

    private function getRandomSpecialityFromDoctor(User $doctor){
        $specialities = $doctor->getSpecialities();

        return $specialities[
            rand(0, count($specialities)-1)
        ];
    }

    private function getRandomPatient()
    {
        return $this->getReference(
            UserFixtures::PATIENT_REFERENCE
            . rand(0, UserFixtures::PATIENTS_COUNT - 1));
    }


    public function getDependencies()
    {
        return array(
            StatusFixtures::class,
            UserFixtures::class
        );
    }
}
