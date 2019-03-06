<?php

namespace App\DataFixtures;

use App\Entity\Speciality;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\Persistence\ObjectManager;

class SpecialityFixtures extends Fixture implements FixtureGroupInterface
{
    public const SPECIALITY_REFERENCE = 'speciality';
    public const SPECIALITIES = [
        'allergologie ou immunologie',
        'anesthésiologie',
        'andrologie',
        'cardiologie',
        'chirurgie',
        'chirurgie cardiaque',
        'chirurgie esthétique, plastique et reconstructive.',
        'chirurgie générale',
        'obstétrique'
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::SPECIALITIES as $key => $name) {
            $speciality = new Speciality();
            $speciality->setName($name);

            $manager->persist($speciality);
            $manager->flush();
            $this->addReference(self::SPECIALITY_REFERENCE . $key, $speciality);
        }
    }

    public static function getGroups(): array
    {
        return ['prod'];
    }
}
