<?php

namespace App\DataFixtures;

use App\Entity\Speciality;
use App\Entity\Status;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\Persistence\ObjectManager;

class StatusFixtures extends Fixture
{
    public const STATUS_REFERENCE = 'status';

    public const STATUS = [
        'requested',
        'confirmed',
        'canceled',
        'executed',
        'reported'
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::STATUS as $key => $name) {
            $status = new Status();
            $status->setName($name);

            $manager->persist($status);
            $manager->flush();
            $this->addReference(self::STATUS_REFERENCE . $key, $status);
        }
    }
}
